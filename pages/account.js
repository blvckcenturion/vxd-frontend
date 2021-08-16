import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import { useRouter } from 'next/router';
 
const account = () => {
    return (
        <BasicLayout className="account">
            <h1>Estamos en mi cuenta</h1>
        </BasicLayout>
    )
}

export default account
