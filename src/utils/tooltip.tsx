import React, { RefObject, useState } from 'react';
import styled from 'styled-components';

const StyledTooltip = styled.div<{ right: number; top: number; width: number }>`
    position: fixed;
    opacity: 0.7;
    top: ${({ top }) => top - 20}px;
    left: ${({ right, width }) => right + width / 2}px;
    background-color: #e6edf3;
    padding: 2px 4px;
    border-radius: 5px;
    z-index: 9999;
    font-size: 1.2rem;
    transform: translate(-50%, -50%);

    ::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-width: 5px;
        border-style: solid;
        border-color: #e6edf3 transparent transparent transparent;
        top: 16px;
        left: 50%;
        transform: translate(-50%);
    }
`;

interface ITooltip {
    component: RefObject<HTMLDivElement>;
    content: string;
}

const Tooltip: React.FC<ITooltip> = ({ component, content }) => {
    const [show, setShow] = useState<boolean>(false);
    const { current } = component;
    const Rect = current?.getBoundingClientRect();

    const x = Math.floor(Rect?.left ?? 0);
    const y = Math.floor(Rect?.top ?? 0);
    const width = Math.floor(Rect?.width ?? 0);

    current?.addEventListener('mouseenter', () => setShow(true));
    current?.addEventListener('mouseleave', () => setShow(false));

    return show ? (
        <StyledTooltip top={y} right={x} width={width}>
            {content}
        </StyledTooltip>
    ) : null;
};

export default Tooltip;
