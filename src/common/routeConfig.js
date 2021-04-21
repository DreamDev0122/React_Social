import Marketing from '$containers/Marketing';
import Home from '$containers/Home';
import OnBoarding from '$containers/OnBoarding';
import Main from '$containers/Main';
import Media from '$containers/Media';
import MediaUpload from '$containers/Media/MediaUpload';
import NewMediaCategory from '$containers/Media/NewMediaCategory';
import NewAlbum from '$containers/Media/NewAlbum';
import NewVideo from '$containers/Media/NewVideo';
import Artist from '$containers/Artist';
import ArtistNew from '$containers/Artist/NewArtist';
import ArtistView from '$containers/Artist/ViewArtist';
import ArtistStats from '$containers/Artist/StatsArtist'; // Deprecated
import ResetPassword from '$containers/ResetPassword';
import SuccessPage from '$containers/Success';
import Favorites from '$containers/Favorites';
import History from '$containers/History';
import ViewMedia from '$containers/Media/ViewMedia';
import PlaylistPage from '$containers/Playlist';
import Insights from '$containers/Insights';
import Profile from '$containers/Profile';
import NotFound from '../containers/NotFound';

export const routePaths = {
  main: '/app',
  marketing: '/',
  onBoarding: '/on-boarding',
  notFound: '/not-found',
  resetPassword: '/reset-password',
  home: '/app/home',
  recommendation: '/app/recommendation',
  newRelease: '/app/new-release',
  topChart: '/app/top-chart',
  feeds: '/app/feeds',
  media: '/app/media',
  newAlbum: '/app/media/new-album',
  newVideo: '/app/media/new-video',
  newMediaCategory: '/app/media/select-category',
  mediaUpload: '/app/media/upload',
  viewMedia: '/app/media/:id',
  artist: '/app/artist',
  newArtist: '/app/artist/new',
  statsArtist: '/app/artist/stats',
  viewArtist: '/app/artist/:id',
  success: '/app/success',
  history: '/app/history',
  favorites: '/app/favorites',
  playlist: '/app/playlist/:id',
  insights: '/app/insights',
  profile: '/app/profile',
};

const roles = {
  'artist': ['Artist', 'Super Admin', 'Admin'],
  'admin': ['Admin', 'Super Admin'],
}

const redirectFunctions = {
  app: (token, role) => {
    if (!token) {
      return routePaths.marketing;
    }
    return false;
  },
  admin: (token, role) => {
    if (!token) {
      return routePaths.marketing;
    }

    if (!roles.admin.includes(role)) {
      return routePaths.home;
    }

    return false;
  }
};

const defaultConfig = {
  exact: true,
  redirect: () => false,
  subPaths: null,
}

export const routes = [
  {
    ...defaultConfig,
    path: routePaths.marketing,
    component: Marketing,
  },
  {
    ...defaultConfig,
    path: routePaths.onBoarding,
    component: OnBoarding,
    redirect: redirectFunctions.app
  },
  {
    ...defaultConfig,
    path: routePaths.resetPassword,
    component: ResetPassword,
  },
  {
    ...defaultConfig,
    path: routePaths.notFound,
    component: NotFound,
  },
  {
    ...defaultConfig,
    path: routePaths.main,
    component: Main,
    exact: false,
    routes: [
      {
        ...defaultConfig,
        path: routePaths.home,
        component: Home,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.recommendation,
        component: Home,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.newRelease,
        component: Home,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.topChart,
        component: Home,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.feeds,
        component: Home,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.history,
        component: History,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.favorites,
        component: Favorites,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.success,
        component: SuccessPage,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.playlist,
        component: PlaylistPage,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.insights,
        component: Insights,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.profile,
        component: Profile,
        redirect: redirectFunctions.app
      },
      {
        ...defaultConfig,
        path: routePaths.artist,
        component: Artist,
        exact: false,
        routes: [
          {
            ...defaultConfig,
            path: routePaths.newArtist,
            component: ArtistNew,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.viewArtist,
            component: ArtistView,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.statsArtist,
            component: ArtistStats,
            redirect: redirectFunctions.app,
          },
        ]
      },
      {
        ...defaultConfig,
        path: routePaths.media,
        component: Media,
        exact: false,
        routes: [
          {
            ...defaultConfig,
            path: routePaths.newMediaCategory,
            component: NewMediaCategory,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.newAlbum,
            component: NewAlbum,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.newVideo,
            component: NewVideo,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.mediaUpload,
            component: MediaUpload,
            redirect: redirectFunctions.app,
          },
          {
            ...defaultConfig,
            path: routePaths.viewMedia,
            component: ViewMedia,
            redirect: redirectFunctions.app,
          },
        ],
      },
    ],
  }
];
