import { Segment , Header , Icon , Dropdown} from 'semantic-ui-react'
import styled from 'styled-components'

const SegmentHeader = styled(Segment) `
    overflow : none !important;
    background : #ff84a1 !important;
    border-color : #ff84a1 !important;
    padding-bottom : 0px !important;
    border-radius : 0px !important;
`;

const TextHeader = styled(Header)`
    margin-bottom : 6px !important;
    font-family: 'Kanit', sans-serif !important;
`;

const Icons = styled(Icon) `
    font-size: 2em !important;
    color : white ;
    padding-top : 5px ;
    margin-right: -10px !important;
`;

const DropdownButton = styled(Dropdown)`
    margin-left : 4px !important;  
    color : white ;
    margin-bottom : 10px;
`;

const DropdownMenu = styled(Dropdown.Menu)`
    margin-left : 11px !important;  
    margin-top : 1px !important; 
`;

const name = 'Tan Kitpakorn'

export default (props) => (
    <div>
        <SegmentHeader clearing >
            <TextHeader as='h4' floated='right'>
            {
                props.authStore.userData
                ?   <DropdownButton simple item text={props.authStore.userData.name}>
                        <DropdownMenu>
                            <Dropdown.Item icon='sign-out' text="Logout" onClick={()=> props.authStore.logout()}/>
                        </DropdownMenu>
                    </DropdownButton>
                : null
            }
            </TextHeader>
            <TextHeader as='h4' floated='right'>
            {
                props.authStore.userData 
                ? null 
                : <Icons name='user cancel'/>
            }
            </TextHeader>
        </SegmentHeader>
    </div>
)