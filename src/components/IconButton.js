import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { TouchableOpacity, Pressable } from "react-native";
import { images } from "../images";

const Icon = styled.Image`
    tint-color: ${({ theme, completed }) => completed ? theme.done : theme.text};
    width: 30px;
    height: 30px;
    margin: 10px;
    `

const IconButton = ({ onPressOut, type, id, completed }) => {
    
    const _onPressOut = () => {
        onPressOut(id)
    }
    return(
        <TouchableOpacity onPressOut={_onPressOut}>
            <Icon
                source={type}
                completed = {completed}
            />
        </TouchableOpacity>
    )
}

IconButton.propTypes = {
    onPressOut: PropTypes.func,
    //oneOf(배열) => 배열에 포함된 값 중에서 하나를 만족
    //Object.values(객체) => 객체의 value만 뽑아서 새로운 배열로 반환
    type: PropTypes.oneOf(Object.values(images)).isRequired,
    id: PropTypes.string,
    completed: PropTypes.bool,
}

export default IconButton;
