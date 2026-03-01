import { AuthController } from '../interfaces/http/controllers/auth.controller';
import { ItemController } from '../interfaces/http/controllers/item.controller';
import { WantController } from '../interfaces/http/controllers/want.controller';
import { AuthService } from '../../application/services/auth.service';
import { ItemService } from '../../application/services/item.service';
import { WantService } from '../../application/services/want.service';
import { SupabaseUserRepository } from '../persistence/repositories/supabase-user.repository';
import { SupabaseItemRepository } from '../persistence/repositories/supabase-item.repository';
import { SupabaseWantRepository } from '../persistence/repositories/supabase-want.repository';

export class Container {
  private authController: AuthController;
  private itemController: ItemController;
  private wantController: WantController;
  private authService: AuthService;
  private itemService: ItemService;
  private wantService: WantService;
  private userRepository: SupabaseUserRepository;
  private itemRepository: SupabaseItemRepository;
  private wantRepository: SupabaseWantRepository;

  constructor() {
    // Repositories
    this.userRepository = new SupabaseUserRepository();
    this.itemRepository = new SupabaseItemRepository();
    this.wantRepository = new SupabaseWantRepository();

    // Services
    this.authService = new AuthService(this.userRepository);
    this.itemService = new ItemService(this.itemRepository);
    this.wantService = new WantService(this.wantRepository, this.itemRepository);

    // Controllers
    this.authController = new AuthController(this.authService);
    this.itemController = new ItemController(this.itemService);
    this.wantController = new WantController(this.wantService);
  }

  getAuthController(): AuthController {
    return this.authController;
  }

  getItemController(): ItemController {
    return this.itemController;
  }

  getWantController(): WantController {
    return this.wantController;
  }
}

export const container = new Container();