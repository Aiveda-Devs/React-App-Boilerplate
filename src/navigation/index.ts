import { Config } from 'src/core/types'

const navigation = (config: Config): any => {
    const superAdmin = config && config.superAdmin

    const superAdminPath: any = {
        title: 'Super Admin',
        identifier: 'super-admin',
        icon: 'eos-icons:admin',
        path: '/apps/super/user',
    }

    let items = [
        {
            title: 'Dashboards',
            identifier: 'dashboard',
            icon: 'tabler:smart-home',
            path: '/apps/dashboard',
        },
    ]

    if (superAdmin) {
        const indexToInsert = items.findIndex(
            (item) => item.title.toLowerCase() === "archived job's"
        )
        if (indexToInsert !== -1) {
            items.splice(indexToInsert + 1, 0, superAdminPath)
        }
    }

    return items
}

export default navigation
