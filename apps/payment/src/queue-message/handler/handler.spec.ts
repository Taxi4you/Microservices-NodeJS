import { Handler } from './handler';
import { Payment } from '../../types';
import { IPaymentLogic } from '../../logic';
import { PaymentQueueMessage } from '@nodejs-microservices/utils';

function getMockPayment(id: string, email: string, productId: string, creditCardNumber: string, quantity: number): Payment {
    return {
        id,
        userEmail: email,
        productId,
        creditCardNumber,
        quantity,
        date: new Date().toISOString(),
    };
}

describe('Handler', () => {
    let mockPaymentLogic: IPaymentLogic;

    beforeEach(() => {
        mockPaymentLogic = {
            getByEmail: jest.fn(),
            remove: jest.fn(),
            add: jest.fn(),
            get: jest.fn(),
        };
    });

    afterEach(() => jest.clearAllMocks());

    it('should not remove payments when emailToRemove is null or undefined', () => {
        // Arrange
        const message: PaymentQueueMessage = { emailToRemove: null };
        const handler = new Handler(mockPaymentLogic);

        // Act
        handler.handle(message);

        // Assert
        expect(mockPaymentLogic.getByEmail).not.toHaveBeenCalled();
        expect(mockPaymentLogic.remove).not.toHaveBeenCalled();
    });

    it('should remove payments when emailToRemove is provided', () => {
        // Arrange
        const mockEmail = 'test@example.com';
        const message: PaymentQueueMessage = { emailToRemove: mockEmail };
        const mockPayment1 = getMockPayment('1', mockEmail, '11', '1234', 7);
        const mockPayment2 = getMockPayment('2', mockEmail, '22', '1235', 10);
        mockPaymentLogic.getByEmail = jest.fn().mockReturnValue([mockPayment1, mockPayment2]);
        const handler = new Handler(mockPaymentLogic);

        // Act
        handler.handle(message);

        // Assert
        expect(mockPaymentLogic.getByEmail).toHaveBeenCalledTimes(1);
        expect(mockPaymentLogic.getByEmail).toHaveBeenCalledWith(mockEmail);
        expect(mockPaymentLogic.remove).toHaveBeenCalledTimes(2);
        expect(mockPaymentLogic.remove).toHaveBeenCalledWith(mockPayment1.id);
        expect(mockPaymentLogic.remove).toHaveBeenCalledWith(mockPayment2.id);
    });

    it('should not remove payments when getByEmail throws an error', () => {
        // Arrange
        const mockEmail = 'test@example.com';
        const message: PaymentQueueMessage = { emailToRemove: mockEmail };
        mockPaymentLogic.getByEmail = jest.fn(() => {
            throw new Error('test');
        });

        // Act
        const handler = new Handler(mockPaymentLogic);

        // Assert
        expect(() => handler.handle(message)).not.toThrow();
        expect(mockPaymentLogic.getByEmail).toHaveBeenCalledTimes(1);
        expect(mockPaymentLogic.getByEmail).toHaveBeenCalledWith(mockEmail);
        expect(mockPaymentLogic.remove).not.toHaveBeenCalled();
    });
});
