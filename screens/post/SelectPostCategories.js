import React, { useEffect, useState } from 'react';
import { alertTextMessages, fieldControllerName, formRequiredRules, jsonConstants, numericConstants } from '../../constants/Constants';
import { fetchCategoryData } from '../../helper/Helper';
import { SDPostCategorySelector } from '../../views/imagePost/SDPostCategorySelector';

export const functionName = props => {

    const { userPosts, setLoaderCallback } = useContext(CategoryContext);

    const [categories, setCategories] = useState(jsonConstants.EMPTY);

    useEffect(() => {
        (async () => {
            setLoaderCallback(true, alertTextMessages.LOADING_CATEGORIES);
            const postCategories = await fetchCategoryData();
            postCategories && setCategories(postCategories);
            postCategories.map(category => category.isSelected = userPosts.details.postCategories.some(selectedCategory =>
                selectedCategory == category.categoryId));
            props.setValueCallBack(userPosts.details.postCategories);
            setLoaderCallback(false);
        })();
        props.register(fieldControllerName.POST_CATEGORIES, formRequiredRules.postCategoryRule);
    }, jsonConstants.EMPTY);
    return (
        <View>
            <SDPostCategorySelector inputName={fieldControllerName.POST_CATEGORIES} formState={formState} maxLength={numericConstants.THREE} setError={props.setErrorCallBack}
                categories={categories} setCategories={setCategories} postCategories={props.postCategories} setValue={props.setValueCallBack} />
        </View>
    )
};
