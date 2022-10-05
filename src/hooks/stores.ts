import { useInjection } from 'inversify-react';

import TYPES from '@containers/global.types';

import { AppBarStoreType } from '@stores/appbar';
import { DragStoreType } from '@stores/drag';
import { FieldStoreType } from '@stores/fields';
import { FormConfigStoreType } from '@stores/formConfig';
import type { ThemeStoreType } from '@stores/theme';
import type { UserStoreType } from '@stores/user';

export function useUserStore() {
  return useInjection<UserStoreType>(TYPES.UserStore);
}

export function useThemeStore() {
  return useInjection<ThemeStoreType>(TYPES.ThemeStore);
}

export function useAppBarStore() {
  return useInjection<AppBarStoreType>(TYPES.AppBarStore);
}

export function useDragStore() {
  return useInjection<DragStoreType>(TYPES.DragStore);
}

export function useFieldStore() {
  return useInjection<FieldStoreType>(TYPES.FieldStore);
}

export function useFormConfigStore() {
  return useInjection<FormConfigStoreType>(TYPES.FormConfigStore);
}
