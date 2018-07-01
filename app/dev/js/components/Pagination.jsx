import React from 'react';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
    };

    this.goTo = this.goTo.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
  }

  goNext() {
    if (this.state.currentPage + 1 < this.props.totalPages) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      }, () => {
        this.props.onChange(this.state.currentPage);
      });
    }
  }

  goPrev() {
    if (this.state.currentPage) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      }, () => {
        this.props.onChange(this.state.currentPage);
      });
    }
  }

  goTo(pageNum) {
    return () => {
      this.setState({
        currentPage: pageNum,
      }, () => {
        this.props.onChange(this.state.currentPage);
      });
    };
  }

  render() {
    const { totalPages } = this.props;
    const { currentPage } = this.state;

    const renderPagination = () => {
      if (totalPages <= 1 || !totalPages) {
        return null;
      }

      const pages = [];

      if (currentPage === 0) {
        pages.push(
          <button className="pagination__item pagination__item--disabled" type="button" key="prev">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon--align_middle" width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z"/>
              <path d="M0 0h18v18H0z" fill="none"/>
            </svg>
          </button>
        );
      } else {
        pages.push(
          <button className="pagination__item" type="button" onClick={this.goPrev} key="prev">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon--align_middle" width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z"/>
              <path d="M0 0h18v18H0z" fill="none"/>
            </svg>
          </button>
        );
      }

      for (let i = 0; i < totalPages; i += 1) {
        if (i === currentPage) {
          pages.push(
            <button className="pagination__item pagination__item--active" type="button" key={i}>{i + 1}</button>
          );
        } else {
          pages.push(
            <button className="pagination__item" type="button" onClick={this.goTo(i)} key={i}>{i + 1}</button>
          );
        }
      }

      if (currentPage + 1 === totalPages) {
        pages.push(
          <button className="pagination__item pagination__item--disabled" type="button" key="next">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon--align_middle" width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M7.5 4.5L6.44 5.56 9.88 9l-3.44 3.44L7.5 13.5 12 9z"/>
              <path d="M0 0h18v18H0z" fill="none"/>
            </svg>
          </button>
        );
      } else {
        pages.push(
          <button className="pagination__item" type="button" onClick={this.goNext} key="next">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon--align_middle" width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M7.5 4.5L6.44 5.56 9.88 9l-3.44 3.44L7.5 13.5 12 9z"/>
              <path d="M0 0h18v18H0z" fill="none"/>
            </svg>
          </button>
        );
      }

      return pages;
    };

    return (
      <div className="pagination">
        <div className="pagination__inner">
          {renderPagination()}
        </div>
      </div>
    );
  }
}
