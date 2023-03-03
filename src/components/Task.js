import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import IconButton from "./IconButton";
import { images } from "../images";
import Input from "./Input";

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme.itemBackground};
    border-radius: 10px;
    padding: 5px;
    margin: 3px 0px;
`
const Contents = styled.Text`
    flex: 1;
    font-size: 24px;
    color: ${({ theme, completed }) => completed ? theme.done : theme.text};
    text-decoration-line: ${({completed}) => completed ? 'line-through' : 'none'}
`

const Task = ({ deleteTask, item, toggleTask, updateTask }) => {
    
    //state
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(item.text); //초기값은 원래 아이템이 가지고 있던 값

    //게시글 수정(버튼이 눌리면 현재상태를 수정중으로 변경)
    const _handleUpdateButteonPress = () => {
        setIsEditing(true);
    }

    //입력완료시 실행되는 함수
    const _onSubmitEditing = () => {
        //isEditing이 참이면(수정중)
        if (isEditing) {
            //item 객체리스트에는 이미 text키가 있으므로 새로운 text로 값 교체 -> 빈 객체에 넣고 -> editedTask에 넣음
            //editedTask = { id: ID, text: 새로교체된 사용자 입력값, completed: false }
            const editedTask = Object.assign({}, item, { text });
            setIsEditing(false) //상태 수정중아님으로 변경
            updateTask(editedTask) //updateTask실행
        }
    }

    //입력취소
    const _onBlur = () => {
        //수정중일경우
        if (isEditing) {
            setIsEditing(false) //수정중 아님으로 변경
            setText(item.text) //원래 써있던 텍스트로 복구
        }
    }
    
    return (
        //isEditing이 참이면(수정중)
        isEditing ? (
            //Input 컴포넌트 출력
            <Input
                value={text}
                onChangeText={text => setText(text)} //text값을 사용자 입력값으로 교체
                onEndEditing={_onSubmitEditing} //입력완료시 _onSubmitEditing함수 실행
                onBlur={_onBlur}
            />
        //거짓이면(수정중아님)
        ) : (
            <Container>
                <IconButton
                    type={item.completed ? images.completed : images.uncompleted}
                    onPressOut={toggleTask}
                    id={item.id}
                    completed={item.completed}
                />

                <Contents completed={item.completed}>
                    {item.text}
                </Contents>

                {/* 완료된 상태가 아니면(completed가 False) IconButton컴포넌트 표시 */}
                    {item.completed || (
                        <IconButton
                            type={images.update}
                            onPressOut={_handleUpdateButteonPress}
                        />
                    )}
                
                <IconButton
                    type={images.delete}
                    onPressOut={deleteTask}
                    id={item.id}
                    completed={item.completed}
                />
            </Container>
        )
)}

export default Task;