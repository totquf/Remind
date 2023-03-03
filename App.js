import React, {useState} from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./src/theme";
import Input from "./src/components/Input";
import Task from "./src/components/Task";
import { Dimensions } from "react-native";

const App = () => {

  //stste
  const [newTask, setNewTask] = useState('')
  const [tasks, setTasks] = useState({
    '1': { id: '1', text: '가나다라', completed: false},
    '2': { id: '2', text: '마바사아', completed: true},
    '3': { id: '3', text: '자차카타', completed: false},
    '4': { id: '4', text: '파하', completed: false}
  })
  const [update, setUpDate] = useState(false)

    //일정등록
    const _addTask = () => {
      if (update) {
        const ID = Date.now().toString()
        const newTaskObject = {
          //[ID] => 변수,함수와 같은 값을 객체의 키로 사용할때는 []를 붙여줘야 함. 
          //[]가 없으면 그냥 문자열 'ID'로 인식
          [ID]: { id: ID, text: newTask, completed: false }
        }
        //스프레드 연산자를 사용해 두 객체를 벗겨서 합침 -> 벗기지 않으면 새로운 KEY가 생성되어 제대로 출력X
        setTasks({ ...tasks, ...newTaskObject })
        //...tasks, ...newTaskObject
        setNewTask('')
        console.log(newTaskObject)
      }
    }
  
    //일정삭제
    const _deleteTask = (id) => {
      //tasks객체의 항목=속성(키+값 모두)을 복사해 빈 객체에 넣음(깊은복사, 메모리주소가 참조됨)
      const currentTask = Object.assign({}, tasks)
      delete currentTask[id]  //Obj['key']로 해당하는 항목의 값에 접근, 삭제
      setTasks(currentTask) //일정이 삭제된 객체 리스트로 상태변경
    }
  
    //일정완료
    const _toggleTask = (id) => {
      //tasks객체의 항목(키+값)을 모두 복사해 currentTask 객체에 넣음(깊은 복사, 메모리 주소가 참조됨)
      const currentTask = Object.assign({}, tasks);
      //currentTask객체 리스트들 중 Obj['key']로 해당하는 항목의 값에 접근, 그 값중에서 completed키의 값에 접근, 해당 값을 !를 사용해 반대 상태로 만듦
      currentTask[id]['completed'] = !currentTask[id]['completed']
      setTasks(currentTask) //값이 변화된 리스트로 상태변경
    }
  
    //일정수정           item = editedTask 
    //                   => { id: 6, text: 새로교체된 사용자 입력값, completed: false }
    const _updateTask = (item) => {
      //tasks객체의 항목(키+값)을 모두 복사해 currentTask 객체에 넣음(깊은 복사, 메모리 주소가 참조됨)
      const currentTask = Object.assign({}, tasks)
      //currentTask 객체의 리스트들 중 Obj['key']로 해당하는 항목의 값에 접근
      //ex)  item.id == '6' -> '6': { id: '6', text: '가나다라', completed: false } = 키가 6인 항목에 값에 접근
      //그 값을 item으로 교체 
      currentTask[item.id] = item //<- { id: 6, text: 새로교체된 사용자 입력값, completed: false }
      setTasks(currentTask) //값이 변화된 리스트로 상태변경
    }
  
    //텍스트 변환, onChangeText는 text만을 호출되는 함수에 전달
    const _handleTextChange = (text) => {
      setNewTask(text)
      setUpDate(true) //업데이트상태 참으로 변경
    }
  
    //입력취소
    const _onBlur = () => {
      setNewTask(''); //입력창 공백으로 초기화
      setUpDate(false) //업데이트상태  변경
      }
  
  return (
    //ThemeProvider로 감싸진 컴포넌트들은 theme정보를 props로넘겨받아 사용 가능
    <ThemeProvider theme={theme}>
      <Container>
        <Title>TODO List</Title>

        <Input
          placeholder={"할일을 입력하세요"}
          value={newTask}
          onChangeText={_handleTextChange}
          onEndEditing={_addTask}
          onBlur={_onBlur}
        />

        <List width={width}>
          {Object.values(tasks) //tasks객체안의 value만 뽑아서 새로운 배열로 만들고
            .reverse() //배열 순서를 뒤집고
            .map((item) => ( //item에 하나씩 넣어서 Task컴포넌트로 출력
              <Task
                text={item.text}
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))}
        </List>
        
      </Container>
    </ThemeProvider>  
  )
}

const width = Dimensions.get('window').width

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justyfy-contents: flex-start;
  `
const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 10px 20px;
  `
const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px
  `
  
export default App;