import React from "react";
import styled from "styled-components";

const ShinyButton = styled.button`
  position: relative;
  width: 100%;
  color: #fff;
  background-color: #1f2937; /* gray-800 */
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.625rem 1.25rem;
  margin-bottom: 0.5rem;
  outline: none;
  transition: background 0.2s;
  overflow: hidden;
  z-index: 1;

  &:hover {
    background-color: #111827; /* gray-900 */
  }

  &::before {
    content: "";
    position: absolute;
    left: 120%;
    bottom: -50%;
    width: 120%;
    height: 200%;
    background: linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0) 100%);
    transform: skew(-20deg);
    transition: left 0.6s cubic-bezier(0.4,0,0.2,1);
    z-index: 2;
    pointer-events: none;
  }

  &:hover::before {
    left: -40%;
    transition: left 0.6s cubic-bezier(0.4,0,0.2,1);
  }
`;

function Button({ label, onClick }) {
  return (
    <ShinyButton onClick={onClick}>
      {label}
    </ShinyButton>
  );
}

export default Button;
