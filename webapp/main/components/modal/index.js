
import React from 'react';
import { connect } from 'react-redux';

import Modal from './Modal.jsx';


const mapStateToProps = state => ({
    userInfo :  state.userInfo
});


export default connect(
    mapStateToProps,    
    null 
)(Modal);