import React from 'react'
import { withLayout } from '../../hoc'
import { compose, withProps , withState , withHandlers } from 'recompose'
import styled from 'styled-components'
import { Button , Icon , Table , Modal , Header } from 'semantic-ui-react'
import Link from 'next/link'
import { TextHeaderTable } from '../../components/TextHeader'
import theme from '../../theme/default';

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
`;

const TableHeadcell = styled(Table.HeaderCell)`
    border-color : ${theme.colors.elementBackground} !important;
`;

const ButtonEdit = styled(Button)`
    color : ${theme.colors.fontBlack} !important;
    background : ${theme.colors.buttonEdit} !important;
    font-family : 'Kanit', sans-serif !important;
`;

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
    withState('list' , 'setlist' , ['Fontend Developer' , 'Backend Developer' , 'Fullstack Developer' , 'Design UX/UI' , 'Tester']),
    withProps({
        pageTitle: 'Positions'
    }),
    withLayout
)

let pos_name = 'Positions (ตำแหน่ง)'
let button_name = 'เพิ่มตำแหน่ง'
let link = '/position/addPosition'

export default enhance( (props)=> 
    <Div>
        {TextHeaderTable(pos_name , `จำนวนตำแหน่งงานทั้งหมด ${props.list.length} ตำแหน่ง` , button_name , link)}
        <TablePosition striped>
            <Table.Header>
                <Table.Row>
                    <TableHeadcell>
                        <center>รหัส</center>
                    </TableHeadcell>
                    <TableHeadcell>
                        <center>ตำแหน่ง</center>
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
                                <center>{i + 1}</center>
                            </TableCell>
                            <TableCell>
                                <center>{data}</center>
                            </TableCell>
                            <TableCell>
                                <center>
                                    <Link href={{ pathname: '/position/editPosition', query: { name : data } }}>
                                        <ButtonEdit animated='fade' size='mini'>
                                            <Button.Content visible content='แก้ไข'/>
                                            <Button.Content hidden >
                                                <Icon name='edit' />
                                            </Button.Content>
                                        </ButtonEdit>
                                    </Link>
                                    <Modal 
                                        trigger={
                                            <ButtonAdd animated='fade' size='mini' color="youtube">
                                                <Button.Content visible content='ลบ'/>
                                                <Button.Content hidden >
                                                    <Icon name='trash alternate' />
                                                </Button.Content>
                                            </ButtonAdd>
                                        }
                                        size="tiny"
                                    >
                                        <HeaderContent icon='archive' content='ลบข้อมูลตำแหน่งใช่หรือไม่ ?' />
                                            <Modal.Content>
                                                <p>
                                                    คุณต้องการลบข้อมูลตำแหน่งงาน {data} ใช่หรือไม่ ?
                                                </p>
                                            </Modal.Content>
                                        <Modal.Actions>
                                            <ButtonAdd>
                                                <Icon name='remove' /> ยกเลิก
                                            </ButtonAdd>
                                            <ButtonAdd color='green'>
                                                <Icon name='checkmark' /> ตกลง
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