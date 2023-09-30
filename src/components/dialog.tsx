import { DialogContent, DialogTitle, Dialog as MuiDialog } from "@mui/material";

type DialogProps = {
  title?: string
  isOpen?: boolean
  onClose?: (reason: string) => void
  children?: any | undefined
}

const Dialog = (props: DialogProps) => <MuiDialog
  open={props.isOpen || false}
  onClose={props.onClose}
>
  {!!props.title && <DialogTitle>{props.title}</DialogTitle>}
  <DialogContent sx={{minWidth:400}}>
    {props.children}
  </DialogContent>
</MuiDialog>


export default Dialog