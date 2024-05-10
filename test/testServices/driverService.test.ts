import { driverService } from '../../src/services/driverService';
import driverSchema from '../../src/models/driverModel';
import tempAuthSchema from '../../src/models/tempAuthModal';

describe('driverService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('updateDriver should call findByIdAndUpdate method of driverSchema model with correct id and query', async () => {
    const mockFindByIdAndUpdate = jest.spyOn(driverSchema, 'findByIdAndUpdate').mockResolvedValueOnce({});
    const id = 'yourId';
    const updateQuery = {};
    await driverService.updateDriver(id, updateQuery);
    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(id, updateQuery, { new: true });
  });

  // it('registerUser should call create method of driverSchema model with correct query', async () => {
  //   // const mockCreate = jest.spyOn(driverSchema, 'create').mockResolvedValueOnce({});
  //   const query = {name: 'tushar'};
  //   await driverService.registerUser(query);
  //   // expect(mockCreate).toHaveBeenCalledWith(query);
  // });

  it('findPhoneNumber should call findOne method of tempAuthSchema model with correct query', async () => {
    const mockFindOne = jest.spyOn(tempAuthSchema, 'findOne').mockResolvedValueOnce({});
    const query = {};
    await driverService.findPhoneNumber(query);
    expect(mockFindOne).toHaveBeenCalledWith(query);
  });

  it('removeTempUser should call findByIdAndDelete method of tempAuthSchema model with correct id', async () => {
    const mockFindByIdAndDelete = jest.spyOn(tempAuthSchema, 'findByIdAndDelete').mockResolvedValueOnce({});
    const id = 'yourId';
    await driverService.removeTempUser(id);
    expect(mockFindByIdAndDelete).toHaveBeenCalledWith(id);
  });
    
});
