import React from 'react';
import account from './account.svg';
import alert from './alert.svg';
import arrowDown from './arrowDown.svg';
import arrowLeft from './arrowLeft.svg';
import arrowRight from './arrowRight.svg';
import camera from './camera.svg';
import circlePlus from './circle-plus.svg';
import comments from './comments.svg';
import file from './file.svg';
import folder from './folder.svg';
import gear from './gear.svg';
import github from './github.svg';
import google from './google.svg';
import heart from './heart.svg';
import heartBorder from './heartBorder.svg';
import home from './home.svg';
import link from './link.svg';
import list from './list.svg';
import loader from './loader.svg';
import menu from './menu.svg';
import moreHorizontal from './more-horizontal.svg';
import paperPlane from './paperPlane.svg';
import photos from './photos.svg';
import plus from './plus.svg';
import send from './send.svg';
import singIn from './sing-in.svg';
import success from './success.svg';
import trash from './trash.svg';
import undo from './undo.svg';
import upload from './upload.svg';
import user from './user.svg';
import zoom from './zoom.svg';

export const Icons = {
  account,
  alert,
  arrowDown,
  arrowRight,
  arrowLeft,
  camera,
  comments,
  gear,
  heart,
  heartBorder,
  home,
  moreHorizontal,
  paperPlane,
  photos,
  upload,
  user,
  zoom,
  success,
  google,
  github,
  loader,
  circlePlus,
  file,
  folder,
  plus,
  menu,
  list,
  trash,
  undo,
  link,
  singIn,
  send,
} as const satisfies Record<string, React.FC<React.SVGProps<SVGSVGElement>>>;
