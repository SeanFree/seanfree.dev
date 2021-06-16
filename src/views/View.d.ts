import React from 'react'

declare interface View {
  Component: React.FunctionComponent<any, any> | React.Component<any, any>
  path: string
}

export default View
