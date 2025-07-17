// ** Custom Menu Components
import VerticalNavLink from './Navlink'

interface Props {
    parent?: any
    navHover?: boolean
    navVisible?: boolean
    groupActive: string[]
    isSubToSub?: any
    currentActiveGroup: string[]
    navigationBorderWidth: number
    settings: any
    saveSettings: any
    setGroupActive: (value: string[]) => void
    setCurrentActiveGroup: (item: string[]) => void
    verticalNavItems?: any
}

const resolveNavItemComponent = (item: any | any | any) => {
    return VerticalNavLink
}

const NavItems = (props: Props) => {
    // ** Props
    const { verticalNavItems } = props

    const RenderMenuItems = verticalNavItems?.map(
        (item: any, index: number) => {
            const TagName: any = resolveNavItemComponent(item)
            return <TagName {...props} key={index} item={item} />
        }
    )
    return <>{RenderMenuItems}</>
}

export default NavItems
