import {
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { InputNumber } from 'antd';
import type { InputNumberProps } from 'antd/es/input-number';

interface IProps extends InputNumberProps {
  stepControlOnly?: boolean;
}

const DInputNumber = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { stepControlOnly, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!);
  const disableInput = useCallback(() => {
    if (stepControlOnly && inputRef.current) {
      inputRef.current.setAttribute('readonly', 'true');
    }
  }, [stepControlOnly]);
  useEffect(() => {
    disableInput();
  }, [disableInput]);
  return <InputNumber {...rest} ref={inputRef} />;
});

export default DInputNumber;
