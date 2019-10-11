<div id="patReqnListOnSampleORLabNo" class="container-fluid mt-2 mb-3" style="display: none;">
      <div id='app3' class="p-2 shadow rounded bg-white hover-shadow">
        <b-tabs content-class="">

          <b-tab title="Home">
            <div class="row no-gutters">

              <div class="col-md-9">

                <div class="row p-2 align-items-center no-gutters">
                  <div class="card col-md-4 hoverCards" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">Pending Tests</h5>
                      <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="card-link">Card link</a>
                      <a href="#" class="card-link">Another link</a>
                    </div>
                  </div>

                  <div class="card col-md-4 hoverCards" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">Apcoming Appointments</h5>
                      <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="card-link">Card link</a>
                      <a href="#" class="card-link">Another link</a>
                    </div>
                  </div>

                  <div class="card col-md-4 hoverCards" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">Previous Requisitions</h5>
                      <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="card-link">Card link</a>
                      <a href="#" class="card-link">Another link</a>
                    </div>
                  </div>
                </div>

                <div class="row p-2 align-items-center no-gutters">
                  <div class="card col-md-4 hoverCards" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">Abnormal Tests Reports</h5>
                      <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="card-link">Card link</a>
                      <a href="#" class="card-link">Another link</a>
                    </div>
                  </div>

                  <div class="card col-md-4 hoverCards" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">Pending Reports</h5>
                      <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="card-link">Card link</a>
                      <a href="#" class="card-link">Another link</a>
                    </div>
                  </div>

                  <div class="card col-md-4 hoverCards" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="card-link">Card link</a>
                      <a href="#" class="card-link">Another link</a>
                    </div>
                  </div>
                </div>

              </div>

              <div class="col-md-3" style="border-left: 3px solid gray;">
                <p class="d-flex justify-content-center">Notification Space</p>
              </div>

            </div>
          </b-tab>

          <b-tab title="Graph" hidden>
            <p>Here Comes Graph</p>
          </b-tab>

          <b-tab title="SampleBased Test" id="sampleBasedTabSampleNo" active>
            <table id="DataTable6" class="table table-sm dt-responsive  nowrap table-condensed mx-md-0 shadow rounded bg-white hover-shadow" style="width:100%">
              <caption>Investigation Tracking List By Cr. No.</caption>
              <thead>
                <tr>
                  <th class="all">
                    <i class="fas fa-chevron-circle-up text-danger d-none collapseButton"></i>
                    <i class="fas fa-chevron-circle-down text-success expandButton"></i>
                    S.No
                  </th>
                  <th class="">Requisition Date</th>
                  <th class="">Lab Name</th>
                  <th class="">Advised By Dep.</th>
                  <th class="">Group/Test Name</th>
                  <th class="">Status</th>
                  <th class="">Turn Around Time</th>
                  <th class="">Sample No.</th>
                  <th class="">Rate</th>
                  <th class="">B/UnBilled</th>
                  <th class="">Note</th>

                  <th class="none">Requisition Date</th>
                  <th class="none">Requisition By</th>
                  <th class="none">Advised By Doc.</th>
                  <th class="none">Group/Test Name</th>
                  <th class="none">Appointment DateTime</th>
                  <th class="none">Bill No.</th>
                  <th class="none">Bill Date</th>

                  <th class="none">Sample Name</th>
                  <th class="none">Sample No.</th>
                  <th class="none">Sample Coll. Date</th>
                  <th class="none">Sample Coll. By</th>

                  <th class="none">PackingList No.</th>
                  <th class="none">Lab No.</th>
                  <th class="none">PackingList DateTime</th>
                  <th class="none">PackingList Gene. By</th>

                  <th class="none">Lab No.</th>
                  <th class="none">Sample Accep. Date</th>
                  <th class="none">Sample Accep. By</th>
                  <th class="none">Sample Accep. Mode</th>
                  <th class="none">Machine Name</th>

                  <th class="none">Sample Rejec. Date</th>
                  <th class="none">Sample Rejec. By</th>
                  <th class="none">Sample Rejec. Reason</th><!--new-->

                  <th class="none">Result Entry Date</th>
                  <th class="none">Result Entry By</th>
                  <th class="none">Result Entry Parameters</th>
                  <th class="none">Result Valid. Date</th>
                  <th class="none">Result Valid. By</th>

                  <th class="none">Report Gen Date</th>
                  <th class="none">Report Print Date</th>
                  <th class="none">Report Print By</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
              <tfoot>
              </tfoot>
            </table>
          </b-tab>

          <b-tab title="PatientBased Test" id="patientBasedTabLabNo">
            <table id="DataTable7" class="table table-sm dt-responsive  nowrap table-condensed mx-md-0 shadow rounded bg-white hover-shadow" style="width:100%">
              <caption>Investigation Tracking List By Cr. No.</caption>
              <thead>
                <tr>
                  <tr>
                    <th class="all">
                      <i class="fas fa-chevron-circle-up text-danger d-none collapseButton"></i>
                      <i class="fas fa-chevron-circle-down text-success expandButton"></i>
                      S.No
                    </th>
                 	<th class="">Requisition Date</th>
                    <th class="">Lab Name</th>
                    <th class="">Advised By Dep.</th>
                    <th class="">Group/Test Name</th>
                    <th class="">Status</th>
                    <th class="">Turn Around Time</th>
                    <th class="">Accession No.</th>
                    <th class="">Rate</th>
                    <th class="">B/UnBilled</th>
                    <th class="">Note</th>

	                <th class="none">Requisition Date</th>
	                <th class="none">Requisition By</th>
	                <th class="none">Advised By Doc.</th>
	                <th class="none">Group/Test Name</th>
	                <th class="none">Appointment DateTime</th>
	                <th class="none">Bill No.</th>
	                <th class="none">Bill Date</th>

                    <th class="none">Accession No.</th>
                    <th class="none">Patient Accep. Date</th>
                    <th class="none">Patient Accep. By</th>
                    <th class="none">Patient Accep. Mode</th>
                    <th class="none">Machine Name</th>

                    <th class="none">Patient Rejec. Date</th>
                    <th class="none">Patient Rejec. By</th>
                    <th class="none">Patient Rejec. Reason</th><!--new-->

                    <th class="none">Result Entry Date</th>
                    <th class="none">Result Entry By</th>
                    <th class="none">Result Entry Parameters</th>
                    <th class="none">Result Valid. Date</th>
                    <th class="none">Result Valid. By</th>

                    <th class="none">Report Gen Date</th>
                  	<th class="none">Report Print Date</th>
                  	<th class="none">Report Print By</th>
                  </tr>
              </thead>
              <tbody>
              </tbody>
              <tfoot>
              </tfoot>
            </table>
          </b-tab>

        </b-tabs>
      </div>
    </div>
