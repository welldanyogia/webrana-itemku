import React from "react";

interface EditableCellProps {
    value: string;
    row: any;
    column: any;
    updateData: (rowIndex: number, columnId: string, value: string) => void;
}

export const EditableCell: React.FC<EditableCellProps> = ({
                                                              value: initialValue,
                                                              row: { index },
                                                              column: { id },
                                                              updateData,
                                                          }) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onBlur = () => {
        updateData(index, id, value);
    };

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <input
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className="border p-1"
        />
    );
};
