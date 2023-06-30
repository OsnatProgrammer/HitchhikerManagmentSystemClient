import React from 'react'
import styles from './css/loading.module.css'

function Loading() {
    return (
        <div className={`${styles.bodyLading}`}>
            <div className={`${styles.containerLoading}`}>
                <span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <div className={`${styles.base}`} style={{textAlign:'center'}}>
                    <img src="https://lh3.googleusercontent.com/TlQ9gRavfGqHMb0jrm7I4X9aXns9Ljpy6uC0WA5AnvF01PK6OcBy1IZ0ebDoJGJZ-uOXotuaXRZsd_MnTO7L6-U2dKGfxRS8gF_ZDifZVwlv1CE5OFbRwl1oGjYGVtc5-7vTvVfCppiu--pbDof85Td3Kr2rK9RjmqjUagg4WBfCNylcmMNdvrBTdwF75CpAMbpk00akZV_WSuKH-rJoQOZeUTFS6uP-j4L3VclmUuNJc2LHcXfzT-EHei3t74v73FUdxXYnNX_VNi-kJopj69Y970GSIngfTFGxCeMcq5lDwklfX8shUHmJfLtFyobYLARteAj_3vniCr3d5r31n8blB01FgXxnm92gR0IBmcPFwG922EVx4TeFaitx4Blk0dqQqOGEcF_NOC-l_V_uoZqA-pgbwPfEuJfk7wE_JFmwt_slVhU-56VCLDinSTCqxG-LoK-Yh0pU4427W_Wx0BQavaZ9LWo8kHwaVnqdhs68L8g3tcJCddhQtUgba2P4y75KS8_tkeu7Jh4iJaJNBGC4tslCrJYPw33RFTQcl-Y8OrjOrRE-xgaply5yP8pNAahvZSePZXwGeH5uc9FH_pHuZbqW3HhR5PWWkGRz-qFysYXN91feOYGMNk2CKDc5wHRRCvZfiUU7iPCE1UPGUY-F40jsnEOoRUE=w300-h124-no"/>
                </div>
            </div>
            <div className={`${styles.longfazers}`}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <h1>Loading...</h1>

        </div>
    )
}

export default Loading

