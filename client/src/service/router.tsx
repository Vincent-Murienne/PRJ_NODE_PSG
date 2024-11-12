import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../layout/BaseLayout";
import Accueil from "../pages/Accueil";

class Router {
    public getRouter = () => {
        return createBrowserRouter([{
            path: '/',
            element: <BaseLayout />,
            children: [
                {
                    path: '',
                    element: <Accueil />
                }
            ],
        },{
            path: '/admin',
            element: <BaseLayout />,
            children: [
                {
                    path: '',
                    element: <Accueil />
                }
            ],
        }]);
    }
}

export default Router;