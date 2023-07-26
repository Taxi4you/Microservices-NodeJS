import { Handler } from './handler';
import { Product } from '../../types';
import { IProductLogic } from '../../logic';
import { ProductQueueMessage } from '@nodejs-microservices/utils';

function getMockProduct(id: string, email: string, name: string, description: string, price: number): Product {
    return {
        id,
        userEmail: email,
        name,
        description,
        price,
    };
}

describe('Handler', () => {
    let mockProductLogic: IProductLogic;

    beforeEach(() => {
        mockProductLogic = {
            getByEmail: jest.fn(),
            remove: jest.fn(),
            add: jest.fn(),
            get: jest.fn(),
        };
    });

    afterEach(() => jest.clearAllMocks());

    it('should not remove products when emailToRemove is null or undefined', () => {
        // Arrange
        const message: ProductQueueMessage = { emailToRemove: null };
        const handler = new Handler(mockProductLogic);

        // Act
        handler.handle(message);

        // Assert
        expect(mockProductLogic.getByEmail).not.toHaveBeenCalled();
        expect(mockProductLogic.remove).not.toHaveBeenCalled();
    });

    it('should remove products when emailToRemove is provided', () => {
        // Arrange
        const mockEmail = 'test@example.com';
        const message: ProductQueueMessage = { emailToRemove: mockEmail };
        const mockProduct1 = getMockProduct('1', mockEmail, 'Product 1', 'Description of Product 1', 19.99);
        const mockProduct2 = getMockProduct('2', mockEmail, 'Product 2', 'Description of Product 2', 29.99);
        mockProductLogic.getByEmail = jest.fn().mockReturnValue([mockProduct1, mockProduct2]);
        const handler = new Handler(mockProductLogic);

        // Act
        handler.handle(message);

        // Assert
        expect(mockProductLogic.getByEmail).toHaveBeenCalledTimes(1);
        expect(mockProductLogic.getByEmail).toHaveBeenCalledWith(mockEmail);
        expect(mockProductLogic.remove).toHaveBeenCalledTimes(2);
        expect(mockProductLogic.remove).toHaveBeenCalledWith(mockProduct1.id);
        expect(mockProductLogic.remove).toHaveBeenCalledWith(mockProduct2.id);
    });

    it('should not remove productss when getByEmail throws an error', () => {
        // Arrange
        const mockEmail = 'test@example.com';
        const message: ProductQueueMessage = { emailToRemove: mockEmail };
        mockProductLogic.getByEmail = jest.fn(() => {
            throw new Error('test');
        });

        // Act
        const handler = new Handler(mockProductLogic);

        // Assert
        expect(() => handler.handle(message)).not.toThrow();
        expect(mockProductLogic.getByEmail).toHaveBeenCalledTimes(1);
        expect(mockProductLogic.getByEmail).toHaveBeenCalledWith(mockEmail);
        expect(mockProductLogic.remove).not.toHaveBeenCalled();
    });
});
