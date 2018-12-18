import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withState , lifecycle , withHandlers } from 'recompose'
import styled from 'styled-components'
import { Button , Icon , Table , Modal , Header } from 'semantic-ui-react'
import Link from 'next/link'
import { TextHeaderTable } from '../../components/TextHeader'
import theme from '../../theme/default';
import axios from 'axios'

const TablePosition = styled(Table)`
    padding-left : 50px !important;
    padding-right : 50px !important;
    padding-bottom : 20px !important;
    border: none !important;
    background: ${theme.colors.elementBackground} !important;
`;
const TableBody = styled(Table.Body)`
    background: ${theme.colors.elementBackground} !important;
    border-top-width: 100px !important;
`;
const TableRow = styled(Table.Row)`
    border-color : ${theme.colors.elementBackground} ;
    background: ${theme.colors.elementBackground} ;
    cursor : pointer ;
    &:hover {
        background : #ff84a12b !important;
    };
`;
const TableHeadcell = styled(Table.HeaderCell)`
    border-color : ${theme.colors.elementBackground} !important;
`;
const ButtonEdit = styled(Button)`
    color : ${theme.colors.fontBlack} !important;
    background : ${theme.colors.buttonEdit} !important;
    font-family : 'Kanit', sans-serif !important;
`
const ButtonText = styled(Button)`
  font-family : 'Kanit', sans-serif !important;
`
const TableCell = styled(Table.Cell)`
    border-top : none !important;
`
const Div = styled.div `
    position : relative ;
    background : ${theme.colors.elementBackground};
    box-shadow : ${theme.colors.boxShadow};
    margin-right : 13px;
`
const ButtonAdd = styled(Button)`
    font-family : 'Kanit', sans-serif !important;
`
const HeaderContent = styled(Header)`
    font-family : 'Kanit', sans-serif !important;
`

const enhance = compose(
    withState('list' , 'setlist' , []),
    withState('headerName' , 'setHeaderName'),
    withState('open' , 'setOpen' , false),
    withState('idList' , 'setIdList'),
    withProps({
        pageTitle: 'Departments'
    }),
    withLayout,
    lifecycle({
        async componentDidMount(){
            const url = 'http://localhost:4000/departments'
            const res = await axios.get(url)
            this.props.setlist(res.data)
        },
    }),
    withHandlers({
        handleDeleteDepartmentName: props => () => event => {
            const id = props.idList
            const url = `http://localhost:4000/departments/${id}`
            axios.delete(url)
            .then( res => {
                const url = 'http://localhost:4000/departments'
                axios.get(url)
                .then( response => {
                    props.setlist(response.data)
                    props.setOpen(false)
                })
                .catch( err => {
                    console.log(err);
                })
            })
            .catch( err => {
                console.log(err);
            })
        },
        handleModalOpen: props => (foo , name , id) => event => {
            props.setOpen(foo)
            props.setHeaderName(name)
            props.setIdList(id)
        }
    })
)

let department_name = 'แผนกงานในบริษัท'
let button_name = 'เพิ่มแผนกงาน'
let link = '/departments/addDepartments'

export default enhance( (props)=> 
    <Div>
        {TextHeaderTable(department_name , `${props.list.length}` , button_name , 'แผนก' , link)}
        <TablePosition striped>
            <Table.Header>
                <Table.Row>
                    <TableHeadcell>
                        <center>รหัส</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>แผนกงานในบริษัท</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>จัดการข้อมูล</center>
                    </TableHeadcell>
                </Table.Row>
            </Table.Header>
            <TableBody>
                {props.list.map( (data , i) => {
                    return (
                        <TableRow key={i}>
                            <TableCell>
                                <Link href={{ pathname : '../position/position' , query : { id : data.id }}}>
                                    <center>{i + 1}</center>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={{ pathname : '../position/position' , query : { id : data.id}}}>
                                    <center>{data.department_name}</center>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <center>
                                    <Link href={{ pathname: '/departments/editDepartments', query: { id : data.id } }}>
                                        <ButtonEdit animated='fade' size='mini'>
                                            <Button.Content visible content='แก้ไข'/>
                                            <Button.Content hidden >
                                                <Icon name='edit' />
                                             </Button.Content>
                                        </ButtonEdit>
                                    </Link>
                                    <ButtonAdd animated='fade' size='mini' color="youtube" onClick={props.handleModalOpen(true,data.department_name,data.id)}>
                                        <Button.Content visible content='ลบ'/>
                                        <Button.Content hidden >
                                            <Icon name='trash alternate' />
                                        </Button.Content>
                                    </ButtonAdd>
                                    <Modal 
                                        size="tiny"
                                        open={props.open}
                                        dimmer="blurring"
                                    >
                                        <HeaderContent icon='archive' content='ลบข้อมูลตำแหน่งใช่หรือไม่ ?' />
                                            <Modal.Content>
                                                <p>
                                                    คุณต้องการลบข้อมูลตำแหน่งงาน {props.headerName} ใช่หรือไม่ ?
                                                </p>
                                            </Modal.Content>
                                        <Modal.Actions>
                                            <ButtonText  onClick={props.handleModalOpen(false)}>
                                                <Icon name='times' /> ยกเลิก
                                            </ButtonText>
                                            <ButtonAdd color='green' onClick={props.handleDeleteDepartmentName()}>
                                                <Icon name='checkmark' /> ยืนยัน
                                            </ButtonAdd>
                                        </Modal.Actions>
                                    </Modal>
                                </center>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </TablePosition>
    </Div>
) 