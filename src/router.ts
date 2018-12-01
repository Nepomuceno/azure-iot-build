import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Spaces from './views/Spaces.vue';
import Devices from './views/Devices.vue';
import Device from './views/Device.vue';
import Sensors from './views/Sensors.vue';
import Sensor from './views/Sensor.vue';

Vue.use(Router);


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/spaces',
      name: 'spaces',
      component: Spaces,
    },
    {
      path: '/devices',
      name: 'devices',
      component: Devices,
    },
    {
      path: '/devices/:id',
      name: 'device',
      component: Device,
    },
    {
      path: '/sensors',
      name: 'Sensors',
      component: Sensors,
    },
    {
      path: '/sensors/:id',
      name: 'Sensor',
      component: Sensor,
    },
  ],
});
