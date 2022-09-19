import * as React from 'react';
import { hexToHsva } from '@uiw/color-convert';
import { useRef, useState } from 'react';
import { Input, InputState } from '../input/input';
import { Label } from '../label/label';
import { ColorPicker } from '../color-picker/color-picker';
import { useEffect } from 'react';

export interface ColorProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  haveInput?: boolean;
  state?: InputState;
  errorMessage?: string;
  value?: string;
  onColorChange?: (value: string) => void;
}

export const Color = (props: ColorProps) => {
  const {
    label,
    haveInput = true,
    labelClassName = '',
    containerClassName = '',
    state = InputState.Normal,
    errorMessage,
    onColorChange,
    value = '#ff0000',
    ...inputProps
  } = props;

  const [val, setVal] = useState<string>(value || '#000000');
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const input = useRef<HTMLLabelElement>(null);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

  const stateClassName = {
    [InputState.Normal]: '',
    [InputState.Error]: '!border-error-500',
    [InputState.Success]: '!border-success-500',
  };

  const haveValueClassName =
    val.length > 0 && state === InputState.Normal ? `!border-primary-300` : '';

  const disabledClassName = inputProps.disabled ? '!bg-dark-400' : '';

  const onChangeTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const onChangePickerValue = (value: string) => {
    const newVal = value.substring(7) === 'ff' ? value.slice(0, 7) : value;
    setVal(newVal);
    onColorChange && onColorChange(newVal);
  };

  const hexToDecimal = (hex: string) => {
    return parseInt(hex, 16);
  };

  const hexaToHsva = (hexa: string) => {
    const { h, s, v } = hexToHsva(hexa);
    return {
      h,
      s,
      v,
      a: hexa.length > 7 ? hexToDecimal(hexa.substring(7)) / 255 : 1,
    };
  };

  useEffect(() => {
    setTop(input.current?.offsetTop || 0);
    setLeft(input.current?.offsetLeft || 0);
  }, [input]);

  return (
    <label className={`relative block ${containerClassName}`} ref={input}>
      {label && <Label className={labelClassName}>{label}</Label>}
      <div className="flex items-center gap-2">
        {showPicker && input.current && (
          <>
            <ColorPicker
              top={top}
              left={left}
              className=""
              color={hexaToHsva(val)}
              onChange={(e) => onChangePickerValue(e)}
            />
            <div
              className="fixed w-screen h-screen top-0 left-0"
              onClick={() => setShowPicker(false)}
            />
          </>
        )}
        <div
          onClick={() => setShowPicker(true)}
          className="h-10 w-10 flex items-center justify-center rounded-md bg-dark-400 cursor-pointer">
          <div className="h-6 w-6 rounded" style={{ backgroundColor: val }}></div>
        </div>
        {haveInput && (
          <input
            type="text"
            className={`h-10 flex-1 border border-transparent text-xs text-white bg-dark-400 rounded-md px-4 outline-none focus:border-primary-300 transition ${stateClassName[state]} ${haveValueClassName} ${disabledClassName} ${inputProps.className}`}
            maxLength={9}
            value={val.includes('#') ? val.toUpperCase() : `#${val.toUpperCase()}`}
            onChange={(e) => onChangeTextValue(e)}
          />
        )}
      </div>
      {errorMessage && (
        <span className="text-xs text-error-500 mt-1.5" data-testid="input-errormessage">
          {errorMessage}
        </span>
      )}
    </label>
  );
};

export default Color;
