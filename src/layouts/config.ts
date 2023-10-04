import HomeIcon from '@mui/icons-material/Home';
import KeyIcon from '@mui/icons-material/Key';
import AdbIcon from '@mui/icons-material/Adb';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BuildIcon from '@mui/icons-material/Build';
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { MenuMap } from './types';

const menu: MenuMap = {
    main: [
        {
            title: "Dashboard",
            getHref: () => "/",
            icon: HomeIcon
        },
        {
            title: "Admin",
            getHref: () => "/admin",
            icon: AdminPanelSettingsIcon
        },
        {
            title: "Keystore",
            getHref: () => "/keystore",
            icon: KeyIcon
        },
        {
            title: "Build",
            getHref: () => "/build",
            icon: AdbIcon
        }
    ],
    app: [
        {
            title: "Dashboard",
            getHref: () => "/",
            icon: HomeIcon
        },
        {
            title: "Detail",
            getHref: (param) => `/app/${param?.app_id}`,
            icon: InfoIcon,
        },
        {
            title: "Content",
            getHref: (param) => `/app/${param?.app_id}/content`,
            icon: LibraryBooksIcon,
        },
        {
            title: "Ads",
            getHref: (param) => `/app/${param?.app_id}/ads`,
            icon: AdUnitsIcon,
        },
        {
            title: "Build",
            getHref: (param) => `/app/${param?.app_id}/build`,
            icon: BuildIcon,
        },
    ]
}

export default {
    menu
}