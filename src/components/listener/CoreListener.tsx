import { useUIStore } from '@euk-labs/componentz';
import { useContainer } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getPages } from '@config/pages';

import TYPES from '@containers/global.types';

import { useTranslation } from '@hooks/services';
import { useUserStore } from '@hooks/stores';

import { getBreadcrumbPaths } from '@utils/getBreadcrumbPaths';

function CoreListener() {
  const { translate } = useTranslation();
  const container = useContainer();
  const uiStore = useUIStore();
  const userStore = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (router.locale) {
      container.rebind(TYPES.Locale).toConstantValue(router.locale);
    }
  }, [router.locale]);

  useEffect(() => {
    userStore.startTokenInjector();
    userStore.catchUnauthorizedErrors();
    userStore.catchForbiddenErrors();

    uiStore.appBar.setOnClickDrawerOption((page) => {
      router.push(page.link);
    });
  }, []);

  useEffect(() => {
    const privatePath = router.pathname.split('/')[1];

    if (privatePath === 'app' && !userStore.isLogged) {
      userStore.fetchUserInfo();
    }
  }, [router.pathname, userStore.isLogged]);

  useEffect(() => {
    if (userStore.abilities) {
      const pages = getPages(userStore.abilities, translate);
      const breadcrumbPaths = getBreadcrumbPaths(pages, router.pathname);

      uiStore.breadcrumb.setPaths(breadcrumbPaths);
      uiStore.breadcrumb.setOnClickBreadcrumbPath((breadcrumbPath) => {
        router.push(breadcrumbPath.link);
      });
      uiStore.appBar.setPages(pages);

      const lastPath = breadcrumbPaths[breadcrumbPaths.length - 1];

      if (lastPath?.disabled) {
        router.push('/app/no-permissions');
      }
    }
  }, [router.pathname, userStore.abilities]);

  return null;
}

export default observer(CoreListener);
