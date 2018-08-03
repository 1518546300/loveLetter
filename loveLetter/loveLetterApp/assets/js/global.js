import socketController from './data/socketController';
import mainController from './data/mainController';

const global = {};
global.socket = socketController;
global.mainController = mainController;
module.exports = global;
export default global;