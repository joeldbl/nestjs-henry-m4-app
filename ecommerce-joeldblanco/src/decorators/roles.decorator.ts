import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/enums/role.enums';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
