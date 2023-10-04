import { css } from "@emotion/css";
import { FormProps } from "./types";

const Form = (prop: FormProps) => (
  <form
    onSubmit={prop.onSubmit}
    className={css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 1em;
      gap: 1em;
  `}>
    {prop.children}
  </form>
)

export default Form