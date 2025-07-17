import loadable from '@loadable/component'

// ! To avoid 'Window is not defined' error
const DynamicReactApexcharts = loadable(() => import('react-apexcharts'))

export default DynamicReactApexcharts
