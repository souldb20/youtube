import React, { useEffect, useState } from 'react'
import Axios from 'axios';

function Subscribe(props) {
    const userTo = props.userTo
    const userFrom = props.userFrom

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    const onSubscribe = () => {

        let SubscribedVariable = {

            userTo : userTo,
            userFrom : userFrom
        }


        // 이미 구독 중이라면
        if(Subscribed) {
            Axios.post('/api/subscribe/unSubscribe', SubscribedVariable)
            .then(response => {
                if(response.data.success) {
                    setSubscribeNumber(SubscribeNumber - 1)
                    setSubscribed(!Subscribed)
                } else {
                    alert('구독 취소 하는데 실패 하였습니다.')
                }
            })


        // 구독 중이 아니라면    
        } else {

            Axios.post('/api/subscribe/subscribe', SubscribedVariable)
            .then(response => {
                if(response.data.success) {
                    setSubscribeNumber(SubscribeNumber + 1)
                    setSubscribed(!Subscribed)
                } else {
                    alert('구독 하는데 실패 하였습니다.')
                }
            })

        }

    }

    useEffect(() => {

        const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom }
       
        Axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
        .then(response => {
            if(response.data.success) {
                setSubscribeNumber(response.data.subscribeNumber)
            } else {
                alert('구독자 수 정보를 받아오지 못했습니다.')
            }
        })


        Axios.post('/api/subscribe/subcribed', subscribeNumberVariables)
        .then(response => {
            if(response.data.success) {
                setSubscribed(response.data.subscribed)
            } else {
                alert('정보를 받아오지 못했습니다.')
            }
        })

    }, [])


    return (
        <div>
            <button
                onClick={onSubscribe}
                style={{
                    backgroundColor : `${Subscribed ? '#AAAAAA' : '#CC0000' }`, borderRadius : '4px', color : 'white', padding : '10px 16px', fontWeight : '500', fontSize : '1rem', textTransform : 'uppercase' 
                }}
            >
                {SubscribeNumber} {Subscribed ? '구독함' : '구독하기'}
            </button>
        </div>
    )
}

export default Subscribe
