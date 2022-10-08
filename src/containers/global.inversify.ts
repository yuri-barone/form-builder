import componentzContainer from '@euk-labs/componentz/containers/global.inversify';

import { AppBarStore } from '@stores/appbar';
import { DragStore } from '@stores/drag';
import { FieldStore } from '@stores/fields';
import { FormConfigStore } from '@stores/formConfig';
import { UserStore } from '@stores/user';

import { httpService } from '@services/http';
import { LoggerService } from '@services/logger';
import { NotificationService } from '@services/notification';
import { TranslationService } from '@services/translation';

import TYPES from './global.types';

export default function globalContainer(locale = '') {
  return () => {
    const container = componentzContainer();

    container.bind(TYPES.Locale).toConstantValue(locale);
    container.bind(TYPES.ApiService).toConstantValue(httpService);

    container.bind(TYPES.TranslationService).to(TranslationService);
    container.bind(TYPES.NotificationService).to(NotificationService);
    container.bind(TYPES.LoggerService).to(LoggerService);

    container.bind(TYPES.UserStore).to(UserStore).inSingletonScope();
    container.bind(TYPES.AppBarStore).to(AppBarStore).inSingletonScope();
    container.bind(TYPES.DragStore).to(DragStore).inSingletonScope();
    container.bind(TYPES.FieldStore).to(FieldStore).inSingletonScope();
    container.bind(TYPES.FormConfigStore).to(FormConfigStore).inSingletonScope();

    return container;
  };
}
