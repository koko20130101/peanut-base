import {
    Icon,
    Container,
    Header,
    Main,
    Aside,
    Menu,
    MenuItem,
    Submenu,
    Button,
    Table,
    Form,
    Input,
    DatePicker,
    Breadcrumb,
    BreadcrumbItem,
    Dropdown,
    DropdownMenu,
    DropdownItem
} from 'element-ui';

const element = {
    install: function (Vue) {
        Vue.use(Icon),
        Vue.use(Container),
        Vue.use(Header),
        Vue.use(Main),
        Vue.use(Aside),
        Vue.use(Menu),
        Vue.use(MenuItem),
        Vue.use(Submenu),
        Vue.use(Button),
        Vue.use(Table),
        Vue.use(Form),
        Vue.use(Input),
        Vue.use(DatePicker),
        Vue.use(Breadcrumb),
        Vue.use(BreadcrumbItem),
        Vue.use(Dropdown),
        Vue.use(DropdownMenu),
        Vue.use(DropdownItem)
    }
}

export default element