import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from '@ui-kitten/components';

import { styles } from './pagination.styles'

export function Pagination(props){
    const pageNums = [];
    
    for(let i = props.currentRange[0]; i <= props.currentRange[1]; i++){
        pageNums.push(i);
    }
    
    const ForwardIcon = () => (
        <Icon name='arrow-ios-forward' fill="#006FD6" style={styles.arrow}/>
    )

    const BackwardIcon = () =>(
        <Icon name='arrow-ios-back' fill="#006FD6" style={styles.arrow}/>
    )

    return(
        <View style={styles.container}>            
            
            {/* do not display the back arrow if we are on the 1st page (also covers if there are no results/projects) */}
            {props.currentPage === 1 ?
                null
            :
                <TouchableOpacity style={styles.button} onPress={() => props.paginate(props.currentPage - 1)}>
                    <BackwardIcon />
                </TouchableOpacity>
            }

            {pageNums.map((value) =>   
                <TouchableOpacity key={value} style={value === props.currentPage ? styles.selectedBtn : styles.button} onPress={() => props.paginate(value)}>
                    <Text style={value === props.currentPage ? styles.selectedBtnTxt : styles.buttonTxt}>{value}</Text>
                </TouchableOpacity>
            )}
            
            {/* do not display the forward arrow if we are on the last page or if there are no results/projects */}
            {props.currentPage === props.lastPage || props.lastPage === 0 ?
                null
            :
                <TouchableOpacity style={styles.button} onPress={() => props.paginate(props.currentPage + 1)}>
                    <ForwardIcon />
                </TouchableOpacity>
            }

        </View>
    )
}