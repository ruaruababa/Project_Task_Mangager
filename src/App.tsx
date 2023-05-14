import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useState} from 'react';
import {RouterProvider} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import router from './router';
import {getAccessToken} from './utils/auth';

function App() {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 1000,
                        retry: 0,
                    },
                },
            }),
    );

    const accessToken = getAccessToken();
    console.log('accessToken', accessToken);
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                {!accessToken ? (
                    <LoginPage />
                ) : (
                    <RouterProvider router={router} />
                )}
            </QueryClientProvider>
        </div>
    );
}

export default App;
