import React, {useState} from "react";
import { Dimensions } from "react-native";
import styled from "styled-components"; 
import PropTypes from 'prop-types';

const Input = ({ placeholder, value, onChangeText, onEndEditing, onBlur }) => {
    
    return (
        <StyledInput
            value={value}
            onChangeText={onChangeText}
            onEndEditing={onEndEditing}
            onBlur={onBlur} //포커스가 해지될 때 이벤트 실행
            
            width={width}
            placeholder={placeholder}
            maxLength={50}
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='done'
            keyboardAppearance='dark'

        />
    )
}

Input.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onEndEditing: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
}

const width = Dimensions.get('window').width

const StyledInput = styled.TextInput.attrs(({theme}) => ({placeholderTextColor: theme.main}))`
    width: ${({ width }) => width-40}px;
    height: 60px;
    margin: 3px 0px;
    padding: 15px 20px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.itemBackground};
    font-size: 22px;
    color: ${({ theme }) => theme.text};
    `

export default Input;