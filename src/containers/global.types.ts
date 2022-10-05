const TYPES = {
  /**
   * Stores
   */
  ThemeStore: Symbol('ThemeStore'),
  UserStore: Symbol('UserStore'),
  AppBarStore: Symbol('AppBarStore'),
  DragStore: Symbol('DragStore'),
  FieldStore: Symbol('FieldStore'),
  FormConfigStore: Symbol('FormConfigStore'),

  /**
   * Services
   */
  ApiService: Symbol('ApiService'),
  LoggerService: Symbol('LoggerService'),
  Locale: Symbol('Locale'),
  TranslationService: Symbol('TranslationService'),
  NotificationService: Symbol('NotificationService'),

  /**
   * Repositories
   */
  UsersRepository: Symbol('UsersRepository'),
  PeopleRepository: Symbol('PeopleRepository'),
};

export default TYPES;
