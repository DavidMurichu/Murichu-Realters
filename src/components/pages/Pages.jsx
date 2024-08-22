import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from '../admin/auth/Login/Login';
import Header from '../common/header/Header';
import Home from '../home/Home';
import Footer from '../common/footer/Footer';
import About from '../about/About';
import Pricing from '../pricing/Pricing';
import Services from '../services/Services';
import Contact from '../contact/Contact';
import { CompareProvider } from '../appService/compareService';
import Listings from '../listings/Listings';
import { DataProvider } from '../appService/data/DataProvider';
import AdminDashboard from '../admin/dashboard/AdminDashboard';
import AddPropertyForm from '../admin/dashboard/Property/addProperty';
import Compare from '../compare/compare';
import PropertyManagement from '../admin/dashboard/Property/manageproperties';
import DashboardDefault from '../admin/dashboard/Analytics';
import City from '../admin/dashboard/city';
import AddCityForm from '../admin/dashboard/city/addCity';
import PropertyTypeIndex from '../admin/dashboard/PropertyTypes';
import AddPropertyTypeForm from '../admin/dashboard/PropertyTypes/addType';
import PropertyTenure from '../admin/dashboard/propertyTenure';
import AddPropertyTenureForm from '../admin/dashboard/propertyTenure/addTenure';
import ImageViewer from '../Container/ImageCard';
import PropertyInformationPage from '../Container/propertyCard';
import { TenureProvider } from '../appService/TenureProvider';
import AddAgentForm from '../admin/dashboard/Agents/addAgent';
import Agents from '../admin/dashboard/Agents';
import AuthProvider, { useAuth } from '../appService/auth/AuthService';
import AgentProperties from '../home/team/AgentProperties';
import ScrollTop from '../ScrollTop';
import Blog from '../blog';
import UserResponses from '../admin/dashboard/user-response/idex';
import BlogManagement from '../admin/dashboard/Blogs';
import AddBlog from '../admin/dashboard/Blogs/addblog';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <AdminDashboard>
            <Component {...props} />
          </AdminDashboard>
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

const Pages = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <CompareProvider>
          <TenureProvider>
            <Router>
              <ScrollTop />
              <Switch>
                <Route path="/login" component={LoginPage} />

                <AdminRoute path="/admin/manage-property" component={PropertyManagement} />
                <AdminRoute path="/admin/add-property" component={AddPropertyForm} />
                <AdminRoute path="/admin/city" component={City} />
                <AdminRoute path="/admin/add-city" component={AddCityForm} />
                <AdminRoute path="/admin/property-types" component={PropertyTypeIndex} />
                <AdminRoute path="/admin/property-tenures" component={PropertyTenure} />
                <AdminRoute path="/admin/add-property-tenures" component={AddPropertyTenureForm} />
                <AdminRoute path="/admin/add-property-types" component={AddPropertyTypeForm} />
                <AdminRoute path="/admin/agents" component={Agents} />
                <AdminRoute path="/admin/add-agents" component={AddAgentForm} />
                <AdminRoute path="/admin/user-response" component={UserResponses} />
                <AdminRoute path="/admin/blogs" component={BlogManagement} />
                <AdminRoute path="/admin/add-blog" component={AddBlog} />
                <AdminRoute path="/admin" component={DashboardDefault} />

                <Route path="/">
                  <Header />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/compare" component={Compare} />
                    <Route exact path="/property" component={PropertyInformationPage} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/services" component={Services} />
                    <Route exact path="/listings" component={Listings} />
                    <Route exact path="/pricing" component={Pricing} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/property-details/:id" component={PropertyInformationPage} />
                    <Route exact path="/view-photos/:id" component={ImageViewer} />
                    <Route exact path="/agent-details" component={AgentProperties} />
                    <Route exact path="/blogs" component={Blog} />
                  </Switch>
                  <Footer />
                </Route>
              </Switch>
            </Router>
          </TenureProvider>
        </CompareProvider>
      </DataProvider>
    </AuthProvider>
  );
};

export default Pages;
