import {ChangeEvent, FC, useState} from "react";
import {FileInput, Input} from "@telegram-apps/telegram-ui";
import {RefundForm} from "@/features/refunds/types/createRefund.ts";
import * as React from "react";


export const CreateRefund: FC = () => {

	const [form, setForm] = useState<RefundForm>({
		organization: "",
		address: "",
		attachmentUrl: "",
		countProduct: ""
	});

	const [focused, setFocused] = useState<Record<keyof RefundForm, boolean>>({
		organization: false,
		address: false,
		attachmentUrl: false,
		countProduct: false
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;

		setForm({...form, [name]: value})
	}

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		const {name} = e.target;

		setFocused({...focused, [name]: true});
	}

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const {name} = e.target;

		setFocused({...focused, [name]: false});
	}

	return (
		<form>
			<Input
				type="text"
				name="organization"
				placeholder="Организация"
				status={focused.organization ? 'focused' : 'default'}
				value={form.organization}
				tabIndex={1}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			<Input
				type="text"
				name="address"
				placeholder="Адрес"
				status={focused.address ? 'focused' : 'default'}
				value={form.address}
				tabIndex={2}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			<Input
				type="text"
				name="countProduct"
				placeholder="Колличество товара"
				status={focused.countProduct ? 'focused' : 'default'}
				value={form.countProduct}
				tabIndex={3}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			<FileInput
				type="file"
				label="Штрихкод"
				name="attachmentUrl"
				tabIndex={4}
			/>
		</form>
	)
}