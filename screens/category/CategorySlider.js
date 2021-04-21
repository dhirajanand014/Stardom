import { useContext } from "react";
import { CategoryContext } from "../../App";
import { jsonConstants } from "../../constants/Constants";

export const CategorySlider = props => {
    const { fetchCategories, initialCategorySelection } = useContext(CategoryContext);

    const [categories, setCategories] = useState(jsonConstants.EMPTY);

    useEffect(() => {
        fetchCategories(categories, categories, initialCategorySelection);
        const backHandler = BackHandler.addEventListener(backHandlerConstants.HARDWAREBACKPRESS, () => {
            if (route.params && route.params.fromIntro) {
                BackHandler.exitApp();
                return true;
            }
            return false;
        });
        return () => backHandler.remove();
    }, []);

    return (
        <View>

        </View>
    )
}