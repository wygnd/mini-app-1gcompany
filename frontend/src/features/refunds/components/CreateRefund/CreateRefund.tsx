import {FC} from "react";
import {Input} from "@telegram-apps/telegram-ui";

export const CreateRefund: FC = () => {
	return (
		<form>
			<Input placeholder={"Test"} title={"Test"} status={"default"}/>
		</form>
	)
}