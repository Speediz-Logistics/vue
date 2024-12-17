import BaseService from './BaseService';

class PackageService extends BaseService {
  async showPackageDetail(id){
    return this.request('get', `${id}`);
  }
}

export default new PackageService('packages');
