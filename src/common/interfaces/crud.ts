export interface CRUD {
  list: (limit: number, page: number) => Promise<any>;
  create: (resource: any) => Promise<any>;
  updateById: (resourceId: any) => Promise<any>;
  readById: (resourceId: any) => Promise<any>;
  deleteById: (resourceId: any) => Promise<any>;
  patchById: (resourceId: any) => Promise<any>;
}
