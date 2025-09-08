"use client";

import { Button } from "@/components/ui/button";
import { updateState } from "./actions";

type Props = {
	state: "approved" | "rejected" | "pending";
	id: number;
	onChange?: (id: number, state: "approved" | "rejected" | "pending") => void;
};

export const ChangeStateButton = (props: Props) => {
	 return (
		 <Button
			 className="capitalize"
			 onClick={() => {
				 if (props.onChange) {
					 props.onChange(props.id, props.state);
				 } else {
					 updateState(props.state, props.id);
				 }
			 }}
		 >
			 {props.state}
		 </Button>
	 );
};
