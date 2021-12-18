import MainLayout from 'style/MainLayout';

import Dashboard from 'container/Dashboard';
import MyPage from 'container/MyPage';
import News from 'container/News';

const routes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'mypage', element: <MyPage /> },
            { path: 'news', element: <News /> }
        ]
    }
];

export default routes;
