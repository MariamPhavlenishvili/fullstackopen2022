import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    title: "Test title",
    author: "Mari",
    url: "https://sam-does-code.medium.com/useref-example-capturing-previous-state-a7a25fc334df",
    likes: 14,
    user: {
      username: "mari",
      name: "mari",
    },
  };

  let component;
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} updateLikes={mockHandler} />
    );
  });

  test("renders title and author but not url or likes by default", () => {
    expect(component.queryByText(blog.title)).toBeDefined();
    expect(component.queryByText(blog.author)).toBeDefined();
    expect(component.queryByText(blog.url)).not.toBeInTheDocument();
    expect(component.queryByText("likes")).not.toBeInTheDocument();
  });

  test("at start the children are not displayed", () => {
    const details = component.container.querySelector(".blog-details");

    expect(details).toEqual(null);
  });

  test("renders blog details when view button is clicked", () => {
    const button = component.container.querySelector("button");
    fireEvent.click(button);

    const blogDetails = component.container.querySelector(".blog-details");
    expect(blogDetails).toBeInTheDocument();
  });

  test("if the Like button is clicked twice, the event handler is also called twice", () => {
    const viewButton = component.getByText("view");
    fireEvent.click(viewButton);

    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});