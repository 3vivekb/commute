/* globals FileReader */

import {csvParse} from 'd3-dsv'
import omit from 'lodash.omit'
import React, {Component, PropTypes} from 'react'
import {Accordion, Button, Col, ControlLabel, FormControl, FormGroup, Grid, Panel, Row} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import Modal from 'react-modal'

import BackButton from '../containers/back-button'

let uniqueid = 1

export default class AddCommuters extends Component {
  static propTypes = {
    // dispatch
    createCommuters: PropTypes.func.isRequired,

    // props
    existingCommuters: PropTypes.array.isRequired,
    site: PropTypes.object.isRequired
  }

  state = {
    loading: false
  }

  _handleSubmit = () => {
    const {createCommuters} = this.props
    const commutersToCreate = this.state.newCommuters
      ? this.state.newCommuters.map((commuter) => omit(commuter, '_id'))
      : []

    this.setState({ loading: true })

    setTimeout(() => {
      createCommuters(commutersToCreate)
    }, 500)
  }

  _onSelectFile = (event) => {
    const {files} = event.target
    if (!files || files.length === 0) return alert('No File Selected!  Please select a file.')
    const {site} = this.props
    const r = new FileReader()

    r.onload = (e) => {
      const newCommuters = csvParse(e.target.result, (row) => {
        const {address, name} = row
        const _id = row._id || ++uniqueid
        // TODO: parse more field possibilities (first name, last name, etc)
        const newCommuter = {address, _id, name}
        newCommuter.siteId = site._id
        return newCommuter
      })

      this.setState({newCommuters})
    }

    r.readAsText(files[0])
  }

  render () {
    const {existingCommuters, site} = this.props
    const {newCommuters} = this.state ? this.state : {}
    const newCommutersUploaded = newCommuters && newCommuters.length > 0
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h3>
              <span>Add Commuters to Site</span>
              <BackButton />
            </h3>
            <FormGroup controlId='site-label'>
              <ControlLabel>Site</ControlLabel>
              <FormControl
                type='text'
                value={site.name}
                disabled
              />
            </FormGroup>
            <div className='form-group'>
              <label htmlFor='commuters-file' className='control-label'>Select a File</label>
              <input
                accept='text/csv'
                id='commuters-file'
                onChange={this._onSelectFile}
                type='file'
                />
            </div>
            <Accordion>
              <Panel
                header={`${existingCommuters.length} Existing Commuters`}
                bsStyle='info'
                eventKey='1'
                >
                <CommuterTable
                  commuters={existingCommuters}
                  />
              </Panel>
              {newCommutersUploaded &&
                <Panel
                  header={`${newCommuters.length} New Commuters`}
                  bsStyle='success'
                  eventKey='2'
                  >
                  <CommuterTable
                    commuters={newCommuters}
                    />
                </Panel>
              }
            </Accordion>
            {newCommutersUploaded &&
              <Button
                bsStyle='success'
                onClick={this._handleSubmit}
                >
                Add Commuters
              </Button>
            }
          </Col>
        </Row>
        {this.state.isLoading &&
          <Modal>
            <p>Saving commuters, please wait...</p>
          </Modal>
        }
      </Grid>
    )
  }
}

function CommuterTable ({commuters}) {
  return (
    <BootstrapTable
      data={commuters}
      pagination={commuters.length > 10}
      >
      <TableHeaderColumn dataField='_id' isKey hidden />
      <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
      <TableHeaderColumn dataField='address'>Address</TableHeaderColumn>
    </BootstrapTable>
  )
}
